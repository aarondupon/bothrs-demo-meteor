// import * as R from 'ramda';
import {useTracker} from 'react-meteor-hooks';
import {Hero} from '/imports/api/hero';
// const group =  R.groupBy(R.prop('Categorie'));

const useMeteorHeroTracker = () => {

  const { hero = []} = useTracker(
    () => ({
      hero: Hero.find().fetch()
    }),
    []
  );
  const data = hero ;
  return [data];
};
export default useMeteorHeroTracker;
