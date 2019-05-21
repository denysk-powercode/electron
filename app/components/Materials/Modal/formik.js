/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const formik = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Please enter material name'),
    price: Yup.number()
      .positive('Must be positive')
      .required('Please enter material price per kg'),
    additional_info: Yup.string(),
  }),
  enableReinitialize: true,
  mapPropsToValues: ({ material }) => ({
    title: material?.title || '',
    price: material?.price || '',
    additional_info: material?.additional_info || '',
  }),

  handleSubmit: (form, { props, setSubmitting, setErrors }) => {
    console.log('form', form);
    console.log('props', props);
    setSubmitting(true);
    const submitFunc = props.isEdit ? props.updateMaterial : props.createMaterial;
    if (props.isEdit) form.id = props.material.id;
    submitFunc(form, (e) => {
      if (e) {
        setErrors({ networkError: e.message || e });
      } else {
        props.onClose();
      }
      setSubmitting(false);
    });
  },
  displayName: 'MaterialForm',
});

export default formik;
