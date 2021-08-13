import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
import './App.css'

const App = () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)


  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //pegando o featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChoose = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let choosen = originals[0].items.results[randomChoose]
      let choosenInfo = await Tmdb.getMovieInfo(choosen.id, 'tv')
      setFeaturedData(choosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
         <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito por Felipe Ferreira <br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img alt="loading" src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
        </div>  
      }
    </div>
  )
}

export default App