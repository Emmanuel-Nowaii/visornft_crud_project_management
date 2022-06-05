import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

function App() {

  const [project, setProjects] = useState([])

  const readProjects = async () => {
    try {
      const response = await fetch("http://pruebafront.nowaii.com/api/v1/collection/project/")
      const projects = await response.json()
      console.log(projects)
      setProjects(projects)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    readProjects()
  }, [])

  const createProject = e => {
    e.preventDefault();
    axios.post(`http://pruebafront.nowaii.com/api/v1/collection/project/`)
    .then(function(response) {
      console.log(response.data)
      window.location.href = `https://www.google.com.gt/search?q=[${response.data.slug}]`
    })
    .catch(error => console.log(error))
  }

  const deleteProject = id => {
    axios.delete('http://pruebafront.nowaii.com/api/v1/collection/project/', {
      data: {
        id: `${id}`
      }
    })
    .then(function(response) {
      console.log('Eliminado',response)
      alert(response.data.message);
      readProjects()
    })   
    .catch(error => console.log(error))
  };

  let dropdownsContent = document.querySelectorAll(".dropdown_content");
  let buttonsSquareDropdown = document.querySelectorAll(".button_square_dropdown");


    buttonsSquareDropdown.forEach((buttonSquareDropdown, index) => {
      buttonSquareDropdown.onclick = function() {
        dropdownsContent[index].classList.toggle("show_dropdown")
      }
    });

    document.addEventListener("click", function(e) {
      let click = e.target

      dropdownsContent.forEach((dropdownContent, index) => {
          if (dropdownContent.classList.contains("show_dropdown") && click !== buttonsSquareDropdown[index]) {
                dropdownContent.classList.remove("show_dropdown");
          }
      })
  })

  return (
    <div className="App">
      <div className="layout_container">
        <section>
          <div className="card_new_project">
            <h1>Mis proyectos NFT'S</h1>
            <form className="form_content">
              <button className="button_ui" onClick={(e) => createProject(e)}>
                <i>
                  <FontAwesomeIcon icon={faPlus} />
                </i>
                Crear nuevo proyecto
              </button>
            </form>
          </div>
        </section>
        <section>
          <div className='card_container'>
            {
              project.length > 0 ?
              project.map(item => (
                <article key={item.slug}>
                  <div className='card_content'>
                    <a href={`https://www.google.com.gt/search?q=[${item.slug}]`}>
                      <figure>
                        <img src="https://www.elargonauta.com/static/img/no-preview.jpg" alt="NFT Proyecto" />
                      </figure>
                    </a>
                    <div className='card_icon_container'>
                      <div className="card_icon_content">
                        <button className="button_square_dropdown button_square_icon">
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        <div className="dropdown_content dropdown_content__right">
                          <a className="dropdown_item" href={`https://www.google.com.gt/search?q=[${item.slug}]`}>Editar</a>
                          <button className="dropdown_item" onClick={() => deleteProject(item.slug)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
              :
              <article className="card_content_empty">
                <h2>Crea un proyecto</h2>
                <p>No tienes proyectos, crea uno y comienza ahora</p>
              </article>
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;