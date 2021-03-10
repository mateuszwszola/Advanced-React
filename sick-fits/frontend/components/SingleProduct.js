import Head from 'next/head';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  console.log({ data, loading, error });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SingleProduct;
