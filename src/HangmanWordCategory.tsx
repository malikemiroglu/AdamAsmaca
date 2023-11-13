type HangmanWordCategoryProps = {
    currentCategory: string
}

export function HangmanWordCategory( {currentCategory} : HangmanWordCategoryProps) {
    const capitalizedCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

    return (
        <div>
            <h1 style={{ fontFamily:"monospace", fontSize:"2rem"}}>Kategori: <span style={{ color:"darkorange", fontWeight:"bold" }}>{capitalizedCategory}</span></h1>
        </div>
    )
}