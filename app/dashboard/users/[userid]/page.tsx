
import Header from "@/Components/Header";

type Props = {
    params: {
        userid: string; 
    }
}

export default function UserDetailPage({ params }: Props) {
    
    const { userid } = params;

    return (
        <>
            <Header showLoginButton={true} showSingUpButton={true} />
            
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Detalles del Usuario
                </h1>
                
                <p className="text-xl mt-4">
                    Mostrando información para el usuario número: 
                    <span className="font-bold text-orange-500 ml-2">{userid}</span>
                </p>
            </main>
        </>
    );
}
