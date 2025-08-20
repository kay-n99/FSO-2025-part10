import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, fontSize: 16,
  },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a' },
  button: { backgroundColor: '#0366d6', padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

const validationSchema = Yup.object().shape({
  username: Yup.string().min(5, 'Min 5 characters').max(30, 'Max 30 characters').required('Username is required'),
  password: Yup.string().min(5, 'Min 5 characters').max(50, 'Max 50 characters').required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation is required'),
});

const initialValues = { username: '', password: '', passwordConfirm: '' };

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signUp({username, password})
        await signIn({ username, password });   
      navigate("/")
      console.log(data)
    }catch(e){
      console.log(e)
    }
  };

  return (
    <ScrollView>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <TextInput
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              style={[styles.input, touched.username && errors.username && styles.inputError]}
              autoCapitalize="none"
            />
            {touched.username && errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={[styles.input, touched.password && errors.password && styles.inputError]}
              secureTextEntry
            />
            {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
              placeholder="Password confirmation"
              value={values.passwordConfirm}
              onChangeText={handleChange('passwordConfirm')}
              onBlur={handleBlur('passwordConfirm')}
              style={[styles.input, touched.passwordConfirm && errors.passwordConfirm && styles.inputError]}
              secureTextEntry
            />
            {touched.passwordConfirm && errors.passwordConfirm ? <Text style={styles.errorText}>{errors.passwordConfirm}</Text> : null}

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;
