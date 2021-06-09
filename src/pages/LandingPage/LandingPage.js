import React, {useRef, useEffect} from 'react';
import './LandingPage.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

var scaleModifier = 2;

const LandingPage = () => {
  const CamRef = useRef();
  const RenderRef = useRef();
  const gui = new dat.GUI()

  useEffect(() => {

    const canvas = document.querySelector("#c");
    const scene = new THREE.Scene();
    // Objects
    const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    const material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000);
    const sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);
    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 0
    pointLight.position.y = 0
    pointLight.position.z = 0
    scene.add(pointLight)
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        CamRef.current.aspect = sizes.width / sizes.height
        CamRef.current.updateProjectionMatrix()
    
        // Update renderer
        RenderRef.current.setSize(sizes.width, sizes.height)
        RenderRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      });

    const textureLoader = new THREE.TextureLoader()
    const normalTexture = textureLoader.load('../../../img/NormalMap.png')

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

    const clock = new THREE.Clock()

    const tick = () =>
    {

        const elapsedTime = clock.getElapsedTime()

        // Update objects
        sphere.rotation.y = .5 * elapsedTime

        // Update Orbital Controls
        // controls.update()

        // Render
        RenderRef.current.render(scene, CamRef.current)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <canvas className="webgl" id="c" />
    </div>
  )
}

export default LandingPage
