"use client";
const Navbar = () => {
    const toggleThemehandler = (theme: string) => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        document.documentElement.setAttribute("data-theme", theme);
    }
    return (
        <div className="w-full py-4 px-10 flex justify-between items-center border-b">
            <h1>CWX-NEXT</h1>
            <div className="border rounded-3xl p-2 flex gap-2">
                <button className="p-2 rounded-full text-2xl" onClick={() => toggleThemehandler("light")}>🌞</button>
                <button className="p-2 rounded-full" onClick={() => toggleThemehandler("dark")}>🌙</button>
            </div>
        </div>
    )
}

export default Navbar