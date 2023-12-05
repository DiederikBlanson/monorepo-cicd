import React from 'react'
import './App.css'
import {useState, useEffect} from 'react'
import { User, UserList } from '@shared/types'




const App: React.FC = () => {
  const [users, setUsers]  = useState<UserList>([]);

  useEffect(() => {
    fetch("http://localhost:1234/api/information", {method: "GET"}).then(async res => {
      const response = await res.json()
      const api_users: UserList = response.users
      console.log(api_users)
      setUsers(api_users)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        Users:
        <ul>
          {
            users.map((u: User, i: number) => {
              return <li key={i}>
                name: {u.first_name}. email: {u.username}
              </li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
