export default function Button({children, type, onClick}) {
    return (
        <button className="px-4 py-2 bg-green-300 hover:bg-green-600 duration-100 active:shadow-inner active:shadow-black active:bg-green-800 hover:text-white rounded-md" type={type} onClick={onClick}>{children}</button>
    )
}