import React from 'react'
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <div>
        <footer style={{ backgroundColor: "#333", color: "white", padding: "10px 0", textAlign: "center" }}>
            <Container>
                <p className="mb-0 py-1">Copyright © 2024 . OMG Digital Products & Platforms 2024</p>
            </Container>
        </footer>
    </div>
  )
}

export default Footer