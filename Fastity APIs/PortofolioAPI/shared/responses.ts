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
    },
    [2006]: {
        code: 2006,
        message: 'Get ApiTokens sucess'
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
    },
    [4001]: {
        code: 2002,
        status: 404,
        message: 'No API tokens available.'
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

const userError =
{
    
};

const profileResponses =
{
    [2000]: {
        code: 200,
        message: 'Profile retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Profile created with success'
    },
    [2002]: {
        code: 200,
        message: 'Profile updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Profile deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Profile Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Profile.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Profile.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Profile.'
    }
};

const proExpResponses =
{
    [2000]: {
        code: 200,
        message: 'Professional Experience retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Professional Experience created with success'
    },
    [2002]: {
        code: 200,
        message: 'Professional Experience updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Professional Experience deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Professional Experience Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Professional Experience.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Professional Experience.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Professional Experience.'
    }
};

const eduExpResponses =
{
    [2000]: {
        code: 200,
        message: 'Education Experience retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Education Experience created with success'
    },
    [2002]: {
        code: 200,
        message: 'Education Experience updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Education Experience deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Education Experience Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Education Experience.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Education Experience.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Education Experience.'
    }
};

const langResponses =
{
    [2000]: {
        code: 200,
        message: 'Language retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Language created with success'
    },
    [2002]: {
        code: 200,
        message: 'Language updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Language deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Language Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Language.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Language.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Language.'
    }
};


const otherResponses =
{
    [2000]: {
        code: 200,
        message: 'Additional Information retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Additional Information created with success'
    },
    [2002]: {
        code: 200,
        message: 'Additional Information updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Additional Information deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Additional Information Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Additional Information.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Additional Information.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Additional Information.'
    }
};

const projectResponses =
{
    [2000]: {
        code: 200,
        message: 'Project retrieved with success'
    },
    [2001]: {
        code: 200,
        message: 'Project created with success'
    },
    [2002]: {
        code: 200,
        message: 'Project updated with success'
    },
    [2003]: {
        code: 200,
        message: 'Project deleted with success'
    },
    [4001]: {
        code: 404,
        status:404,
        message: 'Error. Project Not Found'
    },
    [4002]: {
        code: 400,
        status:400,
        message: 'Error creating Project.'
    },
    [4003]: {
        code: 400,
        status:400,
        message: 'Error updating Project.'
    },
    [4004]: {
        code: 400,
        status:400,
        message: 'Error deleting Project.'
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

export
{
    authenticationSuccess,
    emailSuccess,
    userSuccess,
    authenticationError,
    generalError,
    userError,
    profileResponses,
    proExpResponses,
    eduExpResponses,
    langResponses,
    otherResponses,
    projectResponses
};

