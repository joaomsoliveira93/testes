import { PageHeader } from '@/components/layout/PageHeader'
import axios from 'axios';
import React, { Suspense } from 'react';
import config from '@/config.json'
import { Content } from './content';

const loadData = async () => {
  const cancelToken = axios.CancelToken.source();
  try {
    const res = await axios.get(`${config.server.apiurl}/allclients`, { cancelToken: cancelToken.token })
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Operação Cancelada!")
    } else {
      console.log(err);
    }
  }

}
export default async function Clientes() {
  const clientes = await loadData();
  return (
    <main className="fixed  z-10 mr-1 top-14 right-2 left-2 md:left-[300px] md:w-[calc(100%-310px)] h-[calc(100%-65px)] p-2 shadow-md  text-black dark:bg-gray-400 bg-white rounded-md">
      <PageHeader title='Clientes' showBackButton={true} url='/utilizadores' />
      <Content clients={clientes} />
    </main>
  )
}
