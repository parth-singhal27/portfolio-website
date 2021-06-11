import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
// import './NormalMap.png'

const Section1 = () => {
  const CamRef = useRef();
  const RenderRef = useRef();
  // const gui = new dat.GUI()
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("NormalMap.png");
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  const scene = new THREE.Scene();
  // Objects
  const geometry = new THREE.SphereBufferGeometry( .5, 64, 64 );
  const material = new THREE.MeshStandardMaterial();
  material.metalness = 0.7
  material.roughness = 0.2
  material.normalMap = texture;   
  // material.color = new THREE.Color(0x242424);
  const sphere = new THREE.Mesh(geometry,material);
  scene.add(sphere);

  const pointLight = new THREE.PointLight(0xffffff, 0.1)
  pointLight.position.x = 4
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)

  const pointLight2 = new THREE.PointLight(0xff00000, 0.2)
  pointLight2.position.x = -3.81
  pointLight2.position.y = 2.52
  pointLight2.position.z = -1.32
  pointLight2.intensity = 0.8
  scene.add(pointLight2)

  const pointLight3 = new THREE.PointLight(0xe1ff, 0.2)
  pointLight3.position.x = 1.26
  pointLight3.position.y = -2.7
  pointLight3.position.z = -2.36
  pointLight3.intensity = 0.52
  scene.add(pointLight3)

  useEffect(() => {
    const canvas = document.querySelector("#c-land-ball");
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        CamRef.current.aspect = sizes.width / sizes.height
        CamRef.current.updateProjectionMatrix()
        RenderRef.current.setSize(sizes.width, sizes.height)
        RenderRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      });

    CamRef.current = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    CamRef.current.position.x = 0
    CamRef.current.position.y = 0
    CamRef.current.position.z = 2
    scene.add(CamRef.current)

    RenderRef.current = new THREE.WebGLRenderer({ 
      canvas: canvas,
      alpha: true
     });

    RenderRef.current.setSize(sizes.width, sizes.height);

    RenderRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  });

  const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.002
  }
  window.addEventListener('scroll', updateSphere);

  let mouseX = 0
  let mouseY = 0

  const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001
    mouseY = (event.clientY - windowHalfY) * 0.001
  }
  document.addEventListener('mousemove', onDocumentMouseMove)

  useEffect(() => {
    const clock = new THREE.Clock()
    const tick = () =>
    {
      const elapsedTime = clock.getElapsedTime()
      sphere.rotation.y = .5 * elapsedTime
      sphere.rotation.y += .5 * (mouseX - sphere.rotation.y)
      sphere.rotation.x += .05 * (mouseY - sphere.rotation.x)
      if ((sphere.position.z > -0.4 || mouseY < 0) && (sphere.position.z < 1 || mouseY > 0)) {
        sphere.position.z += -.035 * (mouseY)
      }
      RenderRef.current.render(scene, CamRef.current)
      requestAnimationFrame(tick)
    }
    
    tick()
  })



  return (
    <div className="section-1">
      <div className="container-name">
        <span className="align-center">
          <h1 className="name">Parth Singhal</h1>
          <img className="landing-page-img" src='github.svg' alt='github-logo'/>
          /
          <img className="landing-page-img" src='linkedn.svg' alt='github-logo'/>
          /
          <img className="landing-page-img" src='instagram.svg' alt='github-logo'/>
          / Work
        </span>
      </div>
      <canvas className="webgl" id="c-land-ball" />
    </div>
  )
}

export default Section1
