import * as THREE from './vendor/three.module.min.js';
import {bartonHallModel} from './venue-models/barton-hall-model.js';

const target = document.querySelector('[data-story-building-art]');
const story = document.querySelector('#top-story');

if (target && story) {
  target.dataset.renderer = 'loading';
  const clamp = (value,min=0,max=1) => Math.min(max,Math.max(min,value));
  const smooth = value => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };
  const phase = (progress,start,end) => smooth((progress - start) / (end - start));
  const color = 0xc09a76;
  const scale = 1 / 50;
  const dims = {
    length: bartonHallModel.dimensions.length * scale,
    width: bartonHallModel.dimensions.width * scale,
    eave: bartonHallModel.dimensions.eaveHeight * scale,
    ridge: bartonHallModel.dimensions.ridgeHeight * scale
  };

  const canvas = document.createElement('canvas');
  canvas.className = 'venue-model-canvas';
  canvas.setAttribute('aria-label','Animated three-dimensional construction study of Barton Hall');
  canvas.setAttribute('role','img');

  try {
    const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const root = new THREE.Group();
    root.rotation.y = -.08;
    scene.add(root);

    const camera = new THREE.OrthographicCamera(-4,4,3,-3,.1,100);
    camera.position.fromArray(bartonHallModel.cameras.editorial.position);
    const cameraTarget = new THREE.Vector3(...bartonHallModel.cameras.editorial.target);
    camera.lookAt(cameraTarget);

    const makeLineMaterial = (opacity=.52,lineColor=color) => {
      const material = new THREE.LineBasicMaterial({color:lineColor,transparent:true,opacity,depthWrite:false});
      material.userData.baseOpacity = opacity;
      return material;
    };
    const makeFillMaterial = (opacity=.025,fillColor=color) => {
      const material = new THREE.MeshBasicMaterial({color:fillColor,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false});
      material.userData.baseOpacity = opacity;
      return material;
    };
    const addEdges = (geometry,parent,opacity=.58,lineColor=color) => {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry),makeLineMaterial(opacity,lineColor));
      parent.add(edges);
      return edges;
    };
    const addBox = (size,position,parent,{fill=.02,edge=.58,lineColor=color}={}) => {
      const geometry = new THREE.BoxGeometry(...size);
      const mesh = new THREE.Mesh(geometry,makeFillMaterial(fill,lineColor));
      mesh.position.set(...position);
      parent.add(mesh);
      addEdges(geometry,mesh,edge,lineColor);
      return mesh;
    };
    const addPlane = (vertices,parent,{fill=.028,edge=.48}={}) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
      geometry.setIndex([0,1,2,0,2,3]);
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry,makeFillMaterial(fill));
      parent.add(mesh);
      addEdges(geometry,mesh,edge);
      return mesh;
    };
    const setGroupOpacity = (group,progress) => {
      group.traverse(object => {
        if (!object.material) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => {
          material.opacity = (material.userData.baseOpacity ?? 1) * progress;
          material.visible = progress > .002;
        });
      });
    };

    const groups = {
      floor:new THREE.Group(),
      plan:new THREE.Group(),
      walls:new THREE.Group(),
      trusses:new THREE.Group(),
      roof:new THREE.Group(),
      openings:new THREE.Group()
    };
    Object.entries(groups).forEach(([name,group]) => {
      group.name = name;
      group.userData.semanticRole = bartonHallModel.components.find(component => component.id === name)?.role;
      root.add(group);
    });

    const {length,width,eave,ridge} = dims;
    addBox([length,.045,width],[0,.0225,0],groups.floor,{fill:.014,edge:.52});

    const addPlanRectangle = (rectangleLength,rectangleWidth,opacity) => {
      const y = .052;
      const points = [
        -rectangleLength/2,y,-rectangleWidth/2, rectangleLength/2,y,-rectangleWidth/2,
        rectangleLength/2,y,-rectangleWidth/2, rectangleLength/2,y,rectangleWidth/2,
        rectangleLength/2,y,rectangleWidth/2, -rectangleLength/2,y,rectangleWidth/2,
        -rectangleLength/2,y,rectangleWidth/2, -rectangleLength/2,y,-rectangleWidth/2
      ];
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
      groups.plan.add(new THREE.LineSegments(geometry,makeLineMaterial(opacity)));
    };
    addPlanRectangle(length-.18,width-.18,.52);
    addPlanRectangle(length-.42,width-.42,.22);
    const planStations = [];
    for (let index=1;index<10;index+=1) {
      const x = -length/2 + (length/10)*index;
      planStations.push(x,.055,-width/2+.22,x,.055,width/2-.22);
    }
    const stationGeometry = new THREE.BufferGeometry();
    stationGeometry.setAttribute('position',new THREE.Float32BufferAttribute(planStations,3));
    groups.plan.add(new THREE.LineSegments(stationGeometry,makeLineMaterial(.12)));
    // Match the established axonometric cutaway: the far shell and east gable
    // read fully, while the near wall remains a ghosted cut edge.
    addBox([length,eave,.075],[0,eave/2,-width/2],groups.walls,{fill:.022,edge:.52});
    addBox([length,eave,.075],[0,eave/2,width/2],groups.walls,{fill:.003,edge:.16});
    addBox([.075,eave,width],[-length/2,eave/2,0],groups.walls,{fill:.005,edge:.22});
    addBox([.075,eave,width],[length/2,eave/2,0],groups.walls,{fill:.02,edge:.5});

    const gableVertices = side => {
      const x = side * length / 2;
      return [x,eave,-width/2, x,eave,width/2, x,ridge,0];
    };
    [-1,1].forEach(side => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(gableVertices(side),3));
      geometry.setIndex([0,1,2]);
      geometry.computeVertexNormals();
      const fullShell = side === 1;
      const mesh = new THREE.Mesh(geometry,makeFillMaterial(fullShell ? .02 : .005));
      groups.walls.add(mesh);
      addEdges(geometry,mesh,fullShell ? .52 : .22);
    });

    const trussCount = 10;
    for (let index=0;index<trussCount;index+=1) {
      const x = -length/2 + (length/(trussCount-1))*index;
      const points = [
        x,eave,-width/2, x,ridge,0,
        x,ridge,0, x,eave,width/2,
        x,eave,-width/2, x,eave,width/2,
        x,eave,-width/2, x,(eave+ridge)/2,0,
        x,(eave+ridge)/2,0, x,eave,width/2
      ];
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
      const truss = new THREE.LineSegments(geometry,makeLineMaterial(.52));
      truss.userData.sequence = index/(trussCount-1);
      groups.trusses.add(truss);
    }

    addPlane([
      -length/2,eave,-width/2,
      length/2,eave,-width/2,
      length/2,ridge,0,
      -length/2,ridge,0
    ],groups.roof,{fill:.036,edge:.52});
    addPlane([
      -length/2,ridge,0,
      length/2,ridge,0,
      length/2,eave,width/2,
      -length/2,eave,width/2
    ],groups.roof,{fill:.006,edge:.22});
    [-1,1].forEach(side => {
      const roofGuidePoints = [];
      for (let index=1;index<6;index+=1) {
        const fraction = index/6;
        const z = side * (width/2) * (1-fraction);
        const y = eave + (ridge-eave) * fraction;
        roofGuidePoints.push(-length/2,y,z,length/2,y,z);
      }
      const roofGuideGeometry = new THREE.BufferGeometry();
      roofGuideGeometry.setAttribute('position',new THREE.Float32BufferAttribute(roofGuidePoints,3));
      groups.roof.add(new THREE.LineSegments(roofGuideGeometry,makeLineMaterial(side === -1 ? .2 : .08)));
    });

    const addWindow = points => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
      groups.openings.add(new THREE.LineSegments(geometry,makeLineMaterial(.4)));
    };
    for (let index=0;index<5;index+=1) {
      const x = -length*.34 + (length*.68/4)*index;
      const z = -width/2-.012;
      const halfWindow = .27;
      const y0 = eave*.34;
      const y1 = eave*.8;
      addWindow([x-halfWindow,y0,z,x+halfWindow,y0,z, x+halfWindow,y0,z,x+halfWindow,y1,z, x+halfWindow,y1,z,x-halfWindow,y1,z, x-halfWindow,y1,z,x-halfWindow,y0,z]);
    }
    for (let index=0;index<3;index+=1) {
      const x = length/2+.012;
      const z = -width*.27 + width*.27*index;
      const halfWindow = .24;
      const y0 = eave*.3;
      const y1 = eave*.74;
      addWindow([x,y0,z-halfWindow,x,y0,z+halfWindow, x,y0,z+halfWindow,x,y1,z+halfWindow, x,y1,z+halfWindow,x,y1,z-halfWindow, x,y1,z-halfWindow,x,y0,z-halfWindow]);
    }

    const setBuildProgress = progress => {
      const walls = phase(progress,.04,.42);
      const trusses = phase(progress,.2,.68);
      const roof = phase(progress,.56,.88);
      const openings = phase(progress,.76,1);

      groups.floor.scale.set(1,1,1);
      setGroupOpacity(groups.floor,1);
      setGroupOpacity(groups.plan,1);

      groups.walls.scale.y = Math.max(.001,walls);
      setGroupOpacity(groups.walls,walls);

      groups.trusses.children.forEach((truss,index) => {
        const local = phase(trusses,index/trussCount*.68,.28 + index/trussCount*.72);
        truss.scale.y = Math.max(.001,local);
        truss.material.opacity = truss.material.userData.baseOpacity * local;
        truss.material.visible = local > .002;
      });

      groups.roof.position.y = 0;
      groups.roof.scale.y = Math.max(.001,roof);
      setGroupOpacity(groups.roof,roof);

      groups.openings.position.y = (1-openings)*.12;
      setGroupOpacity(groups.openings,openings);

      root.rotation.set(0,0,0);
    };

    const setCameraProgress = progress => {
      const tilt = phase(progress,.04,.26);
      const polar = .018 + tilt * .82;
      const azimuth = THREE.MathUtils.lerp(Math.PI/2,.78,tilt);
      const radius = 11.4;
      const targetY = phase(progress,.34,.7) * .48;
      cameraTarget.set(0,targetY,0);
      camera.position.set(
        Math.sin(polar) * Math.cos(azimuth) * radius,
        Math.cos(polar) * radius + targetY,
        Math.sin(polar) * Math.sin(azimuth) * radius
      );
      camera.zoom = THREE.MathUtils.lerp(1.14,1,tilt);
      camera.updateProjectionMatrix();
      camera.up.set(0,1,0);
      camera.lookAt(cameraTarget);
    };

    const resize = () => {
      const widthPx = Math.max(240,target.clientWidth);
      const heightPx = Math.max(175,Math.round(widthPx*.56));
      const pixelRatio = Math.min(devicePixelRatio || 1,2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(widthPx,heightPx,false);
      const aspect = widthPx/heightPx;
      const vertical = widthPx < 760 ? 6.85 : 5.9;
      camera.left = -vertical*aspect/2;
      camera.right = vertical*aspect/2;
      camera.top = vertical/2;
      camera.bottom = -vertical/2;
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = story.getBoundingClientRect();
      const storyProgress = clamp(-rect.top/Math.max(1,rect.height-innerHeight));
      const staticMode = matchMedia('(max-width:560px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches;
      const timelineProgress = staticMode ? 1 : storyProgress;
      const buildProgress = phase(timelineProgress,.38,.74);
      setCameraProgress(timelineProgress);
      setBuildProgress(buildProgress);
      renderer.render(scene,camera);
    };
    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    target.replaceChildren(canvas);
    target.dataset.renderer = 'live';
    target.closest('.story-building-art')?.classList.add('has-live-3d');
    resize();
    render();
    addEventListener('scroll',requestRender,{passive:true});
    addEventListener('resize',() => {resize();requestRender();},{passive:true});
  } catch (error) {
    target.dataset.renderer = 'fallback';
    target.dataset.rendererError = error instanceof Error ? error.message : String(error);
    console.warn('Venue 3D renderer unavailable; retaining the SVG fallback.',error);
  }
}
