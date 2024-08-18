import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IContext, ThemeContext } from '../../App';
import { useDispatch} from 'react-redux';
import { setUnFormData } from '../../redux/slices/uncontrollslice';
import { useNavigate } from 'react-router';
import './UncontrollerForm.css';

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
      photo: Yup.string().required('Фото обязательно'),
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
    <div className="section-form">
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form_title">Uncontrolled Component</h3>
        <div className="input-container ic1">
          <label>Name :</label>
          <input type="text" name="name" ref={nameRef} className="input" />
        </div>
        <div className="input-container ic1">
          <label>Gender Selection</label>
          <select ref={genderRef} className="input">
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <br />
        </div>
        <div className="input-container ic1">
          <label>age</label>
          <input placeholder="age" type="text" ref={ageRef} className="input" />
          <br />
        </div>
        <div className="input-container ic1">
          <label>email</label>
          <input
            placeholder="email"
            type="email"
            ref={emailRef}
            className="input"
          />
          <br />
        </div>
        <div className="input-container ic1">
          <label>password</label>
          <input
            className="input"
            placeholder="password"
            ref={passwordRef}
            type="password"
            required
          />
          <br />
        </div>
        <div className="input-container ic1">
          <label>confirm password</label>
          <input
            className="input"
            ref={confirmPasswordRef}
            placeholder="confirm_password"
            type="password"
            required
          />
          <br />
        </div>

        <div className="input-container ic1">
          <input
            className="input"
            type="file"
            accept="image/*"
            ref={photoRef}
            onChange={handleImageChange}
          />
          <br />
        </div>

        <div className="input-container ic1">
          <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
          <input
            type="checkbox"
            id="acceptTerms"
            ref={termsAndConditionsRef}
            className="input"
          />
          <br />
        </div>
        <button className="button_un" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrollForm;
