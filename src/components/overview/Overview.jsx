import React from 'react';
import axios from 'axios';

import Images from './Images';
import StarRating from './StarRating';
import ProductInfo from './ProductInfo';
import Share from './Share';
import Styles from './Styles';
import Selection from './Selection';
import ProductDescription from './ProductDescription';
import Loading from './Loading';

import { Grid, Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function Overview({ currentProduct, scrollMethod }) {
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getStyles() {
    const response = await axios.get(`/products/${currentProduct.id}/styles`)
      .catch((error) => console.error(error));

    console.log(response.data.results);
    setStyles(response.data.results);
    setCurrentStyle(response.data.results[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      getStyles();
    }
  }, [currentProduct]);

  return (
    <Grid>
      <Row>
        <Col size={3}>
          {isLoading ? <Loading /> : <Images styleImages={currentStyle.photos} />}
        </Col>
        <Col size={1}>
          <StarRating scrollMethod={scrollMethod} />
          <ProductInfo product={currentProduct} style={currentStyle} />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Share
                currentProduct={currentProduct}
                styleImage={styles[0].photos[0].thumbnail_url}
              />
              <Styles
                currentStyles={styles}
                currentStyle={currentStyle}
                changeStyle={setCurrentStyle}
              />
            </>
          )}
          <Selection />
        </Col>
      </Row>
      <Row>
        <ProductDescription
          description={currentProduct.description}
          features={currentProduct.features}
        />
      </Row>
    </Grid>
  );
}

export default Overview;
