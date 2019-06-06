/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const transformInputData = (data) => {
  return Object.entries(data).reduce((init, [key, value]) => {
    if (key === 'client') init.client_id = value.id;
    if (key === 'materials')
      init.materials = value.map((mat) => ({ transaction_price: mat.price, material_id: mat.id, weight: mat.weight }));
    if (key === 'additional_info') init.additional_info = value;
    if (key === 'related_transaction') init.related_transaction_id = value.id;
    return init;
  }, {});
};

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
    client: '',
    related_transaction: '',
  }),
  handleSubmit: (form, { props, setSubmitting, setErrors }) => {
    setSubmitting(true);
    // const submitFunc = props.isEdit ? props.updateMaterial : props.createMaterial;
    // if (props.isEdit) form.id = props.material.id;
    props.createTransaction(transformInputData(form), (e) => {
      if (e) {
        setErrors({ networkError: e.message || e });
      } else {
        props.goBack();
      }
      setSubmitting(false);
    });
  },
  displayName: 'NewTransaction',
});

export default formik;
