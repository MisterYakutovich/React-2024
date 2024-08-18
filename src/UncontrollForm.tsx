import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IContext, ThemeContext } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setUnFormData } from './redux/slices/uncontrollslice';
import { useNavigate } from 'react-router';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}
export interface IFormInput {
  firstName: string;
  age: number;
  gender: GenderEnum;
  email: string;
  password: string;
  confirm_password: string;
  photo: string;
  acceptTerms: boolean;
}

const UncontrollForm = () => {
  const formData2 = useSelector((state: RootState) => state.uncontrollform);
  console.log(formData2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext<null | IContext>(ThemeContext);
  const handleImageChange = context?.handleImageChange;
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (isSubmitted) {
      navigate('/');
    }
  }, [isSubmitted, navigate]);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsAndConditionsRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .matches(/^[A-Z][a-z]*$/, 'Имя должно начинаться с заглавной буквы'),
      age: Yup.number().positive().integer().required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
          'Пароль должен содержать цифру, заглавную и строчную буквы, специальный символ'
        ),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
      gender: Yup.string().required(),
      termsAndConditions: Yup.boolean().oneOf(
        [true],
        'Вы должны принять условия и положения'
      ),
    });

    const data = {
      name: nameRef.current!.value,
      age: ageRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      confirmPassword: confirmPasswordRef.current!.value,
      gender: genderRef.current!.value,
      termsAndConditions: termsAndConditionsRef.current!.checked,
      photo: photoRef.current!.value,
    };

    schema
      .validate(data)
      .then((validatedData) => {
        dispatch(setUnFormData(validatedData));
        alert(`Данные успешно отправлены: ${JSON.stringify(validatedData)}`);
        setIsSubmitted(true);
      })
      .catch((error) => alert(`Ошибка валидации: ${error.errors}`));
  }

  return (
    <div className="App">
      <h1 className="geeks">GeeksForGeeks</h1>
      <h3>Uncontrolled Component</h3>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" ref={nameRef} />
        <label>Gender Selection</label>
        <select ref={genderRef}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <br />
        <label>age</label>
        <input placeholder="age" type="text" ref={ageRef} />
        <br />
        <label>email</label>
        <input placeholder="email" type="email" ref={emailRef} />
        <br />
        <label>password</label>
        <input
          placeholder="password"
          ref={passwordRef}
          type="password"
          required
        />
        <br />
        <label>confirm password</label>
        <input
          ref={confirmPasswordRef}
          placeholder="confirm_password"
          type="password"
          required
        />
        <br />
        <input
          type="file"
          accept="image/*"
          ref={photoRef}
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
        <input type="checkbox" id="acceptTerms" ref={termsAndConditionsRef} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrollForm;
