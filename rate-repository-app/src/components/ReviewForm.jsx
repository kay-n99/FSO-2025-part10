import { Formik } from "formik";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import { CREATE_REVIEW } from "../graphql/mutations";

import * as Yup from "yup";

export const reviewValidationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner's username is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  text: Yup.string().optional(),
});

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "#d73a41",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 10,
  },  
  container: {
    padding: 10,
  }
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      });
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={reviewValidationSchema}
      
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.ownerName && errors.ownerName && styles.inputError,]}
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={[styles.input, touched.repositoryName && errors.repositoryName && styles.inputError,]}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[styles.input, touched.rating && errors.rating && styles.inputError,]}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            value={values.rating}
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, touched.text && errors.text && styles.inputError, {height : 100}]}
            placeholder="Review"
            multiline
            value={values.text}
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
          />
          {touched.text && errors.text && <Text style={styles.errorText}>{errors.text}</Text>}

          <Button onPress={handleSubmit} title="Create a review" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm