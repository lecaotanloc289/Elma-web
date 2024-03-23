import { Button, Card, Container, Grid, IconButton, Rating, Stack } from '@mui/material'
import React from 'react'
import './Blog.scss'
import { Favorite, ShoppingCart, Visibility } from '@mui/icons-material'
import { images } from '../../../assets/images'

const items = [
    {
      Img: images.Blogitem1,
      Date: "07 July 2020",
      Name:   "Types of Blouse In Catalog fashion",
      Content: "In order to discuss the general function of the logo, we must firstly identify and define the environment…"
      
    },
    {
      Img: images.Blogitem2,
      Date: "07 July 2020",
      Name:  "Types of Blouse In Catalog fashion",
      Content: "In order to discuss the general function of the logo, we must firstly identify and define the environment…"
      
    },
    {
      Img: images.Blogitem3,
      Date: "07 July 2020",
      Name: "Types of Blouse In Catalog fashion",
      Content: "In order to discuss the general function of the logo, we must firstly identify and define the environment…"
      
    }
  ]

const Blog = () => {
  return (
  <Container className='blog' maxWidth="lg">
    <Stack className='stack1'>
            <Stack className="name" direction={'row'}>
                <p className="namecate h2 medium">Read our blog</p>
                <Button className=' ' variant='outlined' >
                    <p className='normal h7 medium indigo'>More on blogs</p>
                </Button>
            </Stack>   
            <p className="content">Check our latest article to get meaningfull content or tips for shopping</p>         
    </Stack>

    < Stack className='stack2'>
       <Grid container spacing={2}>
          {
            items.map((item) => {
              return(
                <Grid item xs={4} spacing={1}>
                <Card className='card-item'  >
                  <Stack className="img" >
                      <img className="images" src={item.Img} alt="" />
                  </Stack> 
                  <Stack className="title" spacing={1}>
                      <p className="date">{item.Date}</p>
                      <p className="name">{item.Name}</p>
                      <p className='cont'>{item.Content}</p>
                  </Stack>
                </Card>
              </Grid>
              )
            })
          }  
      </Grid>

      </Stack>
  </Container>
  )
}

export default Blog
