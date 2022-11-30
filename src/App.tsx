import './global.css';
import { Header } from './components/Header'
import {Task} from './components/Task'

export default function App() {
  return (
    <div className="main">
      <Header/>
      <Task/>
      </div>
  )
}

