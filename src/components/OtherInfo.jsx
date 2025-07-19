export default function OtherInfo() {
    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
            <h1>Other Info</h1>
            <p>
                Curious about how this app works behind the scenes? Here's some extra info:
            </p>
            <p>
                <strong>Framework:</strong> Built with React and Vite.<br />
                <strong>Data Storage:</strong> Uses <code>localStorage</code> so your wishlist is saved even after you close the browser.<br />
                <strong>Routing:</strong> Handled with React Router and hash-based URLs.<br />
                <strong>Customization:</strong> You can expand it with filters, maps, or even a login system.
            </p>
        </div>
    );
}
