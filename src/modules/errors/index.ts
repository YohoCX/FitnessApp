import CustomError from "./CustomError";

const Errors = {
    verificationCodeExpired: () => {
      throw new CustomError({
          statusCode: 400,
          message: "code expired",
          description: "verification code expired",
          fields: []
      })
    },

    userAlreadyVerified: () =>{
      throw  new CustomError({
          statusCode: 400,
          message: "user verified",
          description: "user already verified, check route",
          fields: []
      })
    },

    notExists: (fields: string[]) => {
        throw new CustomError({
            statusCode: 404,
            message: "notExists",
            description: "item not exists",
            fields: fields
        })
    },
    unexpectedServerError: () => {
        throw new CustomError({
            statusCode: 500,
            message: "unexpectedServerError",
            description: "unexpected server error occurred",
            fields: []
        })
    },
    userNotExist: () =>{
        throw new CustomError({
            statusCode: 404,
            message: "userNotExist",
            description: "user doesnt exist",
            fields: []
        })
    },
    emailAlreadyExist: () =>{
        throw new CustomError({
            statusCode: 400,
            message: "email already exist",
            description: "use another email",
            fields: []
        })
    },
    verificationCodeDontMatch: () =>{
        throw new CustomError({
            statusCode: 406,
            message: "code doesnt match",
            description: "wrong verification code",
            fields: []
        })
    }
}

export default Errors