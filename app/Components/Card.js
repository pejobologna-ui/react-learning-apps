export default function Card({ title, description, imageUrl}) {
    return(
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            {imageUrl && (
                <img
                    src = {imageUrl}
                    alt = {title}
                    className="w-full h-48 object-cover rounded mb-4"
                />
            )}

            <h2 className="text-2xl font-bold mb-2 text-black">{title}</h2>
            <p className="text-black">{description}</p>
        </div>
    )
}