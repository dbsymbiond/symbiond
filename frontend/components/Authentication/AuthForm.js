import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const AuthForm = ({ isLogin }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!isLogin && !username) newErrors.username = 'Username is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isLogin) {
        console.log('Login with:', { email, password });
      } else {
        console.log('Signup with:', { email, username, password });
      }
    }
  };

  const handleSwitchForm = () => {
    navigation.navigate(isLogin ? 'Signup' : 'Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

      <View style={styles.inputContainer}>
        <LinearGradient
          colors={['#6DA34D', '#5A833C']} // Your gradient colors
          style={styles.inputView}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#FFFFFF"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
          </View>
        </LinearGradient>
        <View style={styles.errorContainer}>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
      </View>

      {!isLogin && (
        <View style={styles.inputContainer}>
          <LinearGradient
            colors={['#6DA34D', '#5A833C']} // Your gradient colors
            style={styles.inputView}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Username..."
                placeholderTextColor="#FFFFFF"
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
              />
            </View>
          </LinearGradient>
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>
      )}

      <View style={styles.inputContainer}>
        <LinearGradient
          colors={['#6DA34D', '#5A833C']} // Your gradient colors
          style={styles.inputView}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#FFFFFF"
              onChangeText={setPassword}
              value={password}
            />
          </View>
        </LinearGradient>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      {isLogin && (
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.authBtn} onPress={handleSubmit}>
        <Text style={styles.authText}>{isLogin ? 'LOGIN' : 'SIGN UP'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSwitchForm}>
        <Text style={styles.authText}>
          {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontWeight: '700',
    fontSize: 50,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    minHeight: 50
  },
  inputView: {
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    fontFamily: 'CormorantGaramond',
    height: 50,
    color: '#FFFFFF',
  },
  forgot: {
    fontFamily: 'CormorantGaramond-SemiBold',
    color: '#FFFFFF',
    fontSize: 11,
    marginBottom: 20,
  },
  authBtn: {
    fontFamily: 'CormorantGaramond-Bold',
    width: '80%',
    backgroundColor: '#F58F00',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  authText: {
    fontFamily: 'CormorantGaramond',
    color: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'CormorantGaramond',
    color: '#C92537',
    fontSize: 12,
  },
});

export default AuthForm;