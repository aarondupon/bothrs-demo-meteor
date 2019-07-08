import * as R from 'ramda';
import {useTracker} from 'react-meteor-hooks';
import {Shop} from '/imports/api/shop';
const group =  R.groupBy(R.prop('Categorie'));

const useMeteorShopTracker = () => {

  const { shop } = useTracker(
    () => ({
      shop: Shop.find().fetch()
    }),
    []
  );
  const data = group(shop);
  return [data];
};
export default useMeteorShopTracker;
