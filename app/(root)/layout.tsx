import Navbar from "../components/Navbar";

export default function Layout({children}:Readonly<{children: React.ReactNode}>){
    //Readonly => we not gonna modify it
    return(
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    )
}