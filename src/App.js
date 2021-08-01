import React, { Component } from 'react';
import imageCompression from 'browser-image-compression';
import { useState} from 'react';
import Home from './component/Home';
import About from './component/About';
import {   BrowserRouter as Router,   Switch,Route, Link } from "react-router-dom";
import './app.css';


function App(){
    const style ={
        transform:'translate(30px, 20px)',
         marginBottom:'20px',
    };


//app states
    const [file, selectFile] = useState('');
    const [fileSet, checksetfile] = useState(false);
    const [compressedFileurl, setCompressedurl] =useState('');
    const [url, seturl] =useState();
    
    console.log(file);
    console.log('originalFile instanceof Blob', file instanceof Blob); // true

    console.log(compressedFileurl);

//handle compression of the file using browser-image-compression dependency
const handleImageToCompress =()=>{
    
    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

      //check if the file to compress has been set/ deploy
    if (fileSet ===true) {
        console.log('originalFile instanceof Blob', file instanceof Blob); // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`); 
        let originalFileSize = 
        document.getElementById('originalfilesize').textContent = `Original file size: ${file.size / 1024 / 1024} MB`; 

          imageCompression(file, options).then(compressedFile=>{
            console.log('compressed file',compressedFile instanceof Blob);
            console.log(`compressed file size ${compressedFile.size / 1024 / 1024} MB`); 
            document.getElementById('compressedfilesize').textContent =`Compressed file size ${compressedFile.size / 1024 / 1024} MB`;
        
              let compressedUrl = URL.createObjectURL(compressedFile);
                setCompressedurl(compressedUrl);
          }).catch(error => console.log(error.message))
    }
 }
  

return(
    <div className='container container_wrapper'>
        <Router>
            <nav className = 'navbar'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
            </nav>
            <Switch>
            <Route exact path='/'>
                <Home />
            </Route>

            <Route path='/about'>
                <About />
            </Route>

        </Switch>
        </Router>

        
        <div className='wrapper'>
            <div className='input_img_wrapper'>
            {file? <img id='orig_img' src={url} alt='' />:<i className="fa fa-file-image-o fa-5x" aria-hidden="true"></i>}
               <p id='originalfilesize'></p>
                <input type='file' id='orig_file' accept="image/*" style={style} onChange={(e)=>{ 
                    selectFile(e.target.files[0]);  
                    checksetfile(true);
                    let fileUrl = URL.createObjectURL(e.target.files[0]);
                    seturl(fileUrl);
                    }}
                     />
                  
            </div>

            <div className='compresser_wrapper'>
                <button onClick = {handleImageToCompress}>Compress Image</button>
            </div>

            <div className='input_img_wrapper download_wrapper'>
                {compressedFileurl? <img src={compressedFileurl} id='compressed_img' alt='' />:  <i className="fa fa-file-image-o fa-5x" aria-hidden="true"></i>}
                <p id='compressedfilesize'></p>
                <a href={compressedFileurl} id='download' download>Download</a>
            </div>
        </div> 
    </div>

)
}
export default App;
