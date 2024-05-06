import { Typography } from "@mui/material";
import kuva from "../assets/omppu_ja_rane.jpg";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
export default function About() {
  return (
    <>
      <Typography variant="h2" sx={{ p: 2 }}>
        Our Story
      </Typography>
      <Stack direction="row" sx={{ pl: 2 }} spacing={3}>
        <Stack direction="column">
          <p>
            Welcome to the whimsical world of PetShop, where tails wag,
            whiskers twitch, and every pet is celebrated as family.
          </p>
          <p>
            Omppu's and Rane's journey began in 2001 with a shared passion for furry friends and a
            desire to enhance their lives with thoughtfully crafted accessories.
            Omppu and Rane, the dynamic duo behind the scenes, poured their
            hearts into creating a haven for pets and their devoted humans
            alike. Inspired by the playful antics of our own beloved companions,
            we set out to curate a collection of pet accessories that blend
            style with functionality.
          </p>
          <p>
            From cozy beds that beckon for afternoon naps to stylish leashes
            that turn daily walks into fashion statements, each item is
            handpicked to meet the needs of pets and their discerning owners.
          </p>
          <p>
            But our story does not end with the products we offer. At Omppu and
            Rane, we believe in the power of community and the joy of shared
            experiences. That is why for over 20 years, we have strived to foster a vibrant online space
            where pet lovers can connect, share stories, and find inspiration.
            Join us on our adventure as we continue to spread love, laughter,
            and tail wags one accessory at a time. Welcome to PetShop,
            where every pet is family.
          </p>
          <Typography variant="h4">Company Details:</Typography>
          <p>Founding year: 2001</p>
          <p>Business Identity Code: 7180283-6</p>
        </Stack>
        <Box sx={{ p: 2 }}>
          <img src={kuva} />
        </Box>
      </Stack>
    </>
  );
}
