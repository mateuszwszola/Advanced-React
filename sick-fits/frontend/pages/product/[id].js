import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

function SingleProductPage({ query }) {
  return (
    <div>
      <SingleProduct id={query.id} />
    </div>
  );
}

SingleProductPage.propTypes = {
  query: PropTypes.object,
};

export default SingleProductPage;
