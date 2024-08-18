import * as yup from 'yup';
import './ControllerForm.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../redux/slices/formslice';
import ImageUploaderComponent from '../../components/imageUploaderComponent/ImageUploaderComponent';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}
export interface IFormInput {
  firstName: string;
  age: string;
  gender: GenderEnum;
  email: string;
  password: string;
  confirm_password: string;
  photo: string;
  acceptTerms: boolean;
}

function ControllerForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [error, setErrors] = useState<IFormInput>({
    firstName: '',
    age: '',
    gender: GenderEnum.male,
    email: '',
    password: '',
    confirm_password: '',
    photo: '',
    acceptTerms: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (isSubmitted) {
      navigate('/');
    }
  }, [isSubmitted, navigate]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(setFormData(data));
    setIsSubmitted(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateField('firstName', e.target.value);
  };
  const handlAcceptTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
    validateField('acceptTerms', e.target.checked);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    validateField('confirm_password', e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateField('email', e.target.value);
  };
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
    validateField('age', e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateField('password', e.target.value);
  };
  const validateField = (
    fieldName: keyof IFormInput,
    value: string | boolean
  ) => {
    schema
      .validateAt(fieldName, { [fieldName]: value })
      .then(() =>
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
      )
      .catch((err: { message: string }) =>
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: err.message }))
      );
  };

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .matches(/^[A-Z]/, 'First name must start with an uppercase letter'),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(32)
      .required()
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
      .matches(/[^\w ]/g, getCharacterValidationError('simbol')),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Passwords must match'),
      photo: yup
      .mixed()
      .test(
        'fileSize',
        'File is too large',
        (value) => {
          if (Array.isArray(value) && value.length > 0) {
            return value[0].size <= 5000000;
          } else {
            return true; 
          }
        }
      )
      .test(
        'fileType',
        'Unsupported file format',
        (value) => {
          if (Array.isArray(value) && value.length > 0) {
            return ['image/jpeg', 'image/png'].includes(value[0].type);
          } else {
            return true; 
          }
        }
      ),

    age: yup
      .number()
      .required('Введите свой возраст')
      .integer('Enter an integer')
      .positive('Must be a positive value')
      .typeError('Field must be a number'),
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  return (
    <section className='section-form'>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
    <div className="input-container ic1">
    <label>First Name</label>
      <input
       className="input"
        type="text"
        id="firstName"
        {...register('firstName')}
        value={name}
        onChange={handleNameChange}
        placeholder=" "
      />
      <div className="cut"></div>
     
      <p className="error_registration">{error.firstName}</p>
      <br />
</div>
<div className="input-container ic1">
      <label>Gender Selection</label>
      <select {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <br />
      </div>
      <div className="input-container ic1">
      <label>age</label>
      <input
       className="input"
        placeholder=""
        type="text"
        id="email"
        {...register('age')}
        value={age}
        onChange={handleAgeChange}
      />
       <div className="cut"></div>
      
     
      <p>{errors.age?.message}</p>
      <p className="error_registration">{error.age}</p>
      <br />


      </div>
      <div className="input-container ic1">
      <label>email</label>
      <input
       className="input"
        {...register('email')}
        placeholder=""
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      
      <p>{errors.email?.message}</p>
      <p className="error_registration">{error.email}</p>
      <br />
      </div>
      <div className="input-container ic1">
      <label>password</label>
      <input
       className="input"
        {...register('password')}
        placeholder=""
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <p>{errors.password?.message}</p>
      <p className="error_registration">{error.password}</p>
      <br />
      </div>
      <div className="input-container ic1">
      <label>confirm password</label>
      <input
       className="input"
        {...register('confirm_password')}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder=""
        type="password"
        required
      />
      <p>{errors.confirm_password?.message}</p>

      <br />
      </div>
      <div className="input-container ic1">
      <label>photo</label>
      <ImageUploaderComponent />
      <p>{errors.photo?.message}</p>
      <br />
      </div>
      <div className="input-container ic1">
      <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
      <input
       className="input"
        type="checkbox"
        {...register('acceptTerms')}
        id="acceptTerms"
        checked={acceptTerms}
        onChange={handlAcceptTermsChange}
      />
      <p>{errors.acceptTerms?.message}</p>
      <p className="error_registration">{error.acceptTerms}</p>
</div>
      <input className="submit" type="submit" />
    </form>
    </section>
  );
}
export default ControllerForm;
