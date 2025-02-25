import { useCallback, useState } from 'react'

export const useApi = <T>(apiFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    apiFunction()
      .then((response) => {
        setData(response)
      })
      .catch((err: unknown) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [apiFunction])

  return { data, loading, error, fetchData }
}
