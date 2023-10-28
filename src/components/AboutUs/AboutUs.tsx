import { Card, CardGroup } from "react-bootstrap"

function AboutUs() {
  return (
    <>
    <section className="container my-4">
    <h2>About Us</h2>
    <p>We are a team of passionate individuals who love to create amazing things. Our mission is to provide high-quality services and products that exceed our customers' expectations.</p>

    <CardGroup>
      <Card className="mx-2">
        <Card.Img variant="top" src="src/assets/images/card1.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. 
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-2">
        <Card.Img variant="top" src="src/assets/images/card2.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-2">
        <Card.Img variant="top" src="src/assets/images/card3.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. 
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
    </section>
    </>
     
  )
}

export default AboutUs