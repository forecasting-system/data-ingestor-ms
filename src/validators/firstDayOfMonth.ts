import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFirstDayOfMonth(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFirstDayOfMonth',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!(value instanceof Date)) return false;
          return value.getDate() === 1;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Date must be the first day of the month';
        },
      },
    });
  };
}
