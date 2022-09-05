import PropTypes from 'prop-types'
import Button from './button'
import {useLocation} from 'react-router-dom';



const Header = ({tittle, onAdd, showAdd}) => {
  const Location = useLocation()
  return (

      <header className='header'>
        <h1>{tittle}</h1>
        {
   Location.pathname === '/' &&  <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
}
      </header>
    )
}

Header.defaultProps = {
  tittle : "Task tracker",

}

Header.propTypes = {
  tittle: PropTypes.string.isRequired,
}
// css in js react
// const headingStyle = {
//   backgroundColor: 'black', color: 'red'
// }

export default Header
