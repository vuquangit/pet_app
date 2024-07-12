import validator from 'validator';

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 32;

export const isValidPassword = (password: string): boolean =>
  validator.isStrongPassword(password, {
    minLength: MIN_PASSWORD_LENGTH,
    returnScore: false,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    pointsPerUnique: 0,
    pointsPerRepeat: 0,
    pointsForContainingLower: 0,
    pointsForContainingUpper: 0,
    pointsForContainingNumber: 0,
    pointsForContainingSymbol: 0,
  }) && password.length <= MAX_PASSWORD_LENGTH;

export const isPasswordMatched = ({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}): boolean =>
  password.length > 0 &&
  passwordConfirmation.length > 0 &&
  password === passwordConfirmation;

export const isEmail = (email: string): boolean => validator.isEmail(email);
