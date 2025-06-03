
function Header() {
    return (
        <nav>
            <div className="logo">
                <img id="troll-face" src="troll-face.png" />
                <h1>Meme Generator</h1>
            </div>
        </nav>
    )
}

function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImages] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    }, [])

    function getMemeImage() {
        const randNum = Math.floor(Math.random() * allMemeImages.length)
        const randURL = allMemeImages[randNum].url

        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage: randURL
            }
        })
    }

    function handleChange(event) {
        const {value, name} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Shut up" 
                    className="form-input"  
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="And take my money" 
                    className="form-input" 
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form-button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

function App() {
    return (
        <div>
            <Header />
            <Meme />
        </div>
        
    )
}


const Root = ReactDOM.createRoot(document.getElementById("root"))
Root.render(<App />)