/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const formik = withFormik({
  validationSchema: (props) => {
    return Yup.object().shape({
      first_name: Yup.string().required('Please enter first name'),
      last_name: Yup.string().required('Please enter last name'),
      login: Yup.string().required('Please enter login'),
      password: props.isEdit ? Yup.string() : Yup.string().required('Please enter password'),
      additional_info: Yup.string(),
    });
  },

  enableReinitialize: true,
  mapPropsToValues: ({ user }) => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    login: user?.login || '',
    password: '',
    additional_info: user?.additional_info || '',
  }),

  handleSubmit: (form, { props, setSubmitting, setErrors }) => {
    setSubmitting(true);
    const submitFunc = props.isEdit ? props.updateUser : props.createUser;
    let data = form;
    if (props.isEdit) {
      data = {
        ...Object.fromEntries(
          Object.entries(data).filter(([field, value]) => field === 'additional_info' || value !== '')
        ),
        id: props.user.id,
      };
    }
    console.log('data in form', data);
    submitFunc(data, (e) => {
      if (e) {
        setErrors({ networkError: e.message || e });
      } else {
        props.onClose();
      }
      setSubmitting(false);
    });
  },
  displayName: 'UserForm',
});

export default formik;
