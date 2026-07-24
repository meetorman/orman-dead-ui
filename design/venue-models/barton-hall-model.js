export const bartonHallModel = {
  id: 'barton-hall',
  label: 'Barton Hall',
  status: 'diagrammatic-cutaway',
  units: 'feet',
  dimensions: {
    length: 362,
    width: 228,
    // Vertical values are normalized animation geometry, not surveyed heights.
    eaveHeight: 62,
    ridgeHeight: 96
  },
  verifiedDimensions: ['length','width'],
  orientation: {
    lengthAxis: 'x',
    verticalAxis: 'y',
    widthAxis: 'z'
  },
  components: [
    {id:'floor',label:'Drill floor',role:'floor',build:[0,.18]},
    {id:'walls',label:'Fieldstone shell',role:'shell',build:[.1,.46]},
    {id:'trusses',label:'Roof trusses',role:'structure',build:[.32,.7]},
    {id:'roof',label:'Roof planes',role:'roof',build:[.54,.88]},
    {id:'openings',label:'Windows and entrances',role:'openings',build:[.74,1]}
  ],
  cameras: {
    editorial: {projection:'orthographic',position:[7.4,5.5,8.7],target:[0,.75,0]},
    plan: {projection:'orthographic',position:[0,10,0],target:[0,0,0]},
    interior: {projection:'perspective',position:[2.5,1.7,2.9],target:[0,.8,0]}
  },
  eventAnchors: {
    stage:'east-floor',
    audience:'main-floor',
    recording:'center-west'
  }
};
