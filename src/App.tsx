import { Provider } from './components/ui/provider'
import { Redirect, Route, Switch, useLocation } from 'wouter'
import Login from './pages/Login'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dogs from './pages/Dogs'
import { Toaster, toaster } from '@/components/ui/toaster'
import { useCallback } from 'react'
import Favorites from './pages/Match'
import Navbar from './components/Navbar'

const QueryProvider = ({ children }: React.PropsWithChildren) => {
    const [_, navigate] = useLocation();
    const toast = useCallback((status?: number) => {
        if (status === 401) {
            navigate('/login', { replace: true })
            toaster.error({
                title: "Unauthorized. Please login.",
                id: 'auth_error',
            })
        }
    }, [navigate])
    const queryClient = new QueryClient({
        mutationCache: new MutationCache({
            onError: (error: any) => toast(error.status as number | undefined)
        }),
        queryCache: new QueryCache({
            onError: (error: any) => toast(error.status as number | undefined)
        })
    })
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

function App() {

    return (
        <Provider>
            <QueryProvider>
                <Navbar position="sticky" top="0" zIndex="docked" />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/browse" component={Dogs} />
                    <Route path="/match/:id" component={Favorites} />
                    <Redirect to="/browse" />
                </Switch>
            </QueryProvider>
            <Toaster />
        </Provider>
    )
}

export default App
