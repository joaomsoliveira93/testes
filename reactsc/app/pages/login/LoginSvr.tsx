import React, { useRef } from 'react'

interface LoginProps {
  validar: (user: string, pass: string) => void
}

export const LoginSvr = ({ validar }: LoginProps) => {
  let username = useRef<string>('');
  let password = useRef<string>('');

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      validar(username.current, password.current);
    }
  };

  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', handleKeyPress);
  }

  return (
    <div className="  mr-auto ml-auto mt-36 h-min bg-white w-full max-w-xs border-1 rounded-xl shadow-black shadow-2xl ">
      <div className="items-center text-center p-10">
        {/*<img src={`${process.env.PUBLIC_URL}/img/companyLogo.png`} alt="" />*/}
      </div>
      <div className="items-center text-center">
        <p className="block text-gray-700 text-xl font-bold mb-10">Licences App</p>
      </div>
      <form className="bg-white shadow-md rounded px-8  pb-8 mb-4 items-center text-center">
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Nome de Utilizador</p>
          <input
            className={`shadow appearance-none border rounded w-full ${username.current === '' && 'border-red-500'} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
            onChange={(event) => { username.current = event.target.value; }}
          />
          {username.current === '' && (
            <p className="text-red-500 text-xs italic">Insira o Nome de Utilizador.</p>
          )}
        </div>
        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">Palavra-Passe</p>
          <input
            className={`shadow appearance-none border rounded w-full ${password.current === '' && 'border-red-500'} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(event) => { password.current = event.target.value; }}
          /> {password.current === '' && (
            <p className="text-red-500 text-xs italic">Insira a Palavra-Passe.</p>
          )}

        </div>
        <div className="mr-auto ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => validar(username.current, password.current)}
          >
            Iniciar Sessão
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs mb-5">
        &copy;2023 Todos os Direitos Reservados.
      </p>
    </div>
  )
}
