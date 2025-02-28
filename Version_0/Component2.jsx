const UserRegistrationForm = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Add form submission logic here
    props.onSubmit({ username, email, password });
    setLoading(false);
  };

  return (
    <KdFormLoader loading={loading} errorMode='onSubmit'>
      <KdpaInput
        label='Username'
        placeholder='Enter your username'
        variant='outlined'
        type='text'
        defaultValue={username}
        title='username'
      />
      <KdpaInput
        label='Email'
        placeholder='Enter your email'
        variant='outlined'
        type='email'
        defaultValue={email}
        title='email'
      />
      <KdpaInput
        label='Password'
        placeholder='Enter your password'
        variant='outlined'
        type='password'
        defaultValue={password}
        title='password'
      />
      <KdpaInput
        label='Repeat Password'
        placeholder='Repeat your password'
        variant='outlined'
        type='password'
        defaultValue={repeatPassword}
        title='repeatPassword'
      />
      <KdpaPrimaryButton
        variant='contained'
        loading={loading}
        title='Submit'
        onClick={handleSubmit}
      />
    </KdFormLoader>
  );
};

export default UserRegistrationForm;