import { Button, Container, Stack } from '@mui/material'
import React from 'react'
import { images } from '../../../assets/images'
import './Flashsale.scss'


const Flashsale = () => {
  return (
    <Container className='flashsale' maxWidth="lg">
            <Stack className='container' direction={'row'}>
                <Stack className='stack1'>
                    <img src={images.lap} alt="" />
                </Stack>

                <Stack className='stack2' spacing={2}>
                    <p className="tag h81 ">FLASH SALE 7.7.7</p>
                    <p className="nametag h2 medium">Lenovo Yoga X</p>
                    <p className="contenttag h8 regular dark-lightest95">Smarter and intuitive with the same expert design
                        and detail. Plus combine innovative latest AI features</p>
                    <Stack direction={'row'} spacing={2}>
                        <Button className=' btn1' variant='contained'>
                        <p className='normal h7 medium white'>Buy Now for $750</p>
                        </Button>
                        <Button className=' '  >
                            <p className='light-through h7 regular '>
                                $1500,00
                            </p>
                        </Button>
                    </Stack>
                </Stack>

            </Stack>
    </Container>
  )
}

export default Flashsale
