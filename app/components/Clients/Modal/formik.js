/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const formik = withFormik({
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('Please enter first name'),
    last_name: Yup.string().required('Please enter last name'),
    additional_info: Yup.string(),
  }),
  enableReinitialize: true,
  mapPropsToValues: ({ client }) => ({
    first_name: client?.first_name || '',
    last_name: client?.last_name || '',
    additional_info: client?.additional_info || '',
  }),

  handleSubmit: (form, { props, setSubmitting, setErrors }) => {
    setSubmitting(true);
    const submitFunc = props.isEdit ? props.updateClient : props.createClient;
    if (props.isEdit) form.id = props.client.id;
    submitFunc(form, (e) => {
      if (e) {
        setErrors({ networkError: e.message || e });
      } else {
        props.onClose();
      }
      setSubmitting(false);
    });
  },
  displayName: 'ClientForm',
});

export default formik;
