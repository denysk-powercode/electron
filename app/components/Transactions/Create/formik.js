/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const formik = withFormik({
  validationSchema: Yup.object().shape({
    materials: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required('Required'),
          weight: Yup.number()
            .positive('Must be positive')
            .required('Required'),
        })
      )
      .required('Must have materials')
      .min(1, 'Minimum 1 material'),
    client: Yup.object().shape({
      first_name: Yup.string().required('Required'),
    }),
  }),
  // enableReinitialize: true,
  mapPropsToValues: () => ({
    // title: material?.title || '',
    // price: material?.price || '',
    // additional_info: material?.additional_info || '',
    materials: [
      {
        id: Math.random(),
        title: '',
        weight: 0,
        price: 0,
        dynamicPrice: 0,
      },
    ],
    client: {
      first_name: '',
      additional_info: '',
    },
  }),
  handleSubmit: (form) => {
    setTimeout(() => {
      alert(JSON.stringify(form, null, 2));
    }, 500);
    // setSubmitting(true);
    // const submitFunc = props.isEdit ? props.updateMaterial : props.createMaterial;
    // if (props.isEdit) form.id = props.material.id;
    // submitFunc(form, (e) => {
    //   if (e) {
    //     setErrors({ networkError: e.message || e });
    //   } else {
    //     props.onClose();
    //   }
    //   setSubmitting(false);
    // });
  },
  displayName: 'NewTransaction',
});

export default formik;
