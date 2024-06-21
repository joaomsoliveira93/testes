const emailSuccess =
{
    [1000]: {
        code: 1000,
        message: 'If the email exists, it was sent successfully to your inbox'
    },
    [1001]: {
        code: 1001,
        message: 'The request to delete your account has been sent to the managers of the platform'
    }
};

const authenticationSuccess = {
    [2000]: {
        code: 2000,
        message: 'Signup was completed successfully'
    },
    [2001]: {
        code: 2001,
        message: 'Login was a success'
    },
    [2002]: {
        code: 2002,
        message: 'Logout was a success'
    },
    [2003]: {
        code: 2003,
        message: 'Access Token refresh was a success'
    },
    [2004]: {
        code: 2004,
        message: 'Password recover was a success'
    },
    [2005]: {
        code: 2005,
        message: 'Password change was a success'
    }
};

const userSuccess =
{
    [3000]: {
        code: 3000,
        message: 'List of Users retrieved with success'
    },
    [3001]: {
        code: 3001,
        message: 'User retrieved with success'
    },
    [3002]: {
        code: 3002,
        message: 'User created with success'
    },
    [3003]: {
        code: 3003,
        message: 'User updated with success'
    },
    [3004]: {
        code: 3004,
        message: 'User deleted with success'
    },
    [3005]: {
        code: 3005,
        message: 'User(s) deleted with success'
    }
};

const generalError =
{
    [1000]: {
        code: 1000,
        status: 400,
        message: 'Something went wrong.'
    }
};

const authenticationError =
{
    [2000]: {
        code: 2000,
        status: 400,
        message: 'Missing the accessToken.'
    },
    [2001]: {
        code: 2001,
        status: 401,
        message: 'Token has expired or is invalid.'
    },
    [2002]: {
        code: 2002,
        status: 400,
        message: 'No Session available.'
    }
};

const userError =
{
    
};


export
{
    authenticationSuccess,
    emailSuccess,
    userSuccess,
    authenticationError,
    generalError,
    userError
};

