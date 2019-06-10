/* eslint-disable camelcase */
import { withFormik } from 'formik';
import * as Yup from 'yup';

const transformInputData = (data) => {
  return Object.entries(data).reduce((init, [key, value]) => {
    if (key === 'client') init.client_id = value.id;
    if (key === 'materials')
      init.materials = value.map((mat) => ({ transaction_price: mat.price, material_id: mat.id, weight: mat.weight }));
    if (key === 'additional_info') init.additional_info = value;
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
  mapPropsToValues: ({ transaction }) => ({
    materials: transaction
      ? transaction.materials.map((item) => ({
          ...item,
          // price: item.transaction_price,
          dynamicPrice: item.transaction_price * item.weight,
        }))
      : [
          {
            id: Math.random(),
            title: '',
            weight: 0,
            price: 0,
            dynamicPrice: 0,
          },
        ],
    client: transaction?.client || '',
    additional_info: transaction?.additional_info || '',
  }),
  handleSubmit: (form, { props, setSubmitting, setErrors }) => {
    setSubmitting(true);
    if (props.transaction) {
      props.openConfirmation();
    } else {
      props.createTransaction(transformInputData(form), (e) => {
        if (e) {
          setErrors({ networkError: e.message || e });
        } else {
          props.goBack();
        }
        setSubmitting(false);
      });
    }
  },
  displayName: 'NewTransaction',
});

export default formik;
