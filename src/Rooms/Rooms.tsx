import React, { useState, useEffect } from "react";
import { useGetActiveRooms } from "../../src/hooks/rooms";
import { ListRooms } from "./ListRooms";
import { Heading, Text } from "@chakra-ui/layout";
import { CustomButton } from "../../src/components/ui/button";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { Paper } from "../components/ui/paper";
import { CustomModal } from "../components/ui/modal";
import { RoomOptions } from "../Rooms/RoomOptions";

export const Rooms = () => {
  const { rooms, loading, error, subscribeToMore } = useGetActiveRooms();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  function closeModal() {
    setModalOpen((currentState) => !currentState);
  }

  function openModal() {
    setModalOpen((currentState) => !currentState);
  }

  useEffect(() => {
    const unsubscribe = subscribeToMore();
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <VStack gap={6} width="600px">
        <Skeleton
          height="200px"
          border="border.primary"
          borderRadius="2% 6% 5% 4% / 1% 1% 2% 4%"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Paper width="600px">
            <SkeletonText />
          </Paper>
        </Skeleton>
        <Skeleton
          height="200px"
          border="border.primary"
          borderRadius="2% 6% 5% 4% / 1% 1% 2% 4%"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Paper width="600px">
            <SkeletonText />
          </Paper>
        </Skeleton>
        <Skeleton
          height="200px"
          border="border.primary"
          borderRadius="2% 6% 5% 4% / 1% 1% 2% 4%"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Paper width="600px">
            <SkeletonText />
          </Paper>
        </Skeleton>
      </VStack>
    );
  }
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        <GridItem
          style={{
            borderRadius: "1rem",
          }}
          height="fit-content"
        >
          <Paper>
            <VStack gap={2}>
              <Heading color="brand.primary" as="h3" size="md">
                Create your own room!
              </Heading>
              <Text>Show Friends and what they're are playing</Text>
              <Text>Add ability to inspect friends</Text>
              <Text>Invite for next game</Text>
              <CustomButton
                icon={
                  <Image
                    alt="logo"
                    src="/icons/icons8-plus-math.svg"
                    width="30"
                    height="30"
                  />
                }
                onClick={openModal}
              >
                Create Room
              </CustomButton>
            </VStack>
          </Paper>
        </GridItem>
        <GridItem rowSpan={2}>
          {rooms && rooms.length === 0 ? (
            <Paper width="100%">
              <Text>There are no active rooms at the moment.</Text>
            </Paper>
          ) : null}
          {error ? (
            <Stack
              width="100%"
              p="4"
              bg="brand.grey"
              height="200px"
              border="border.primary"
              borderRadius="2% 6% 5% 4% / 1% 1% 2% 4%"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            >
              <Heading as="h3" color="brand.primary">
                Error occured
              </Heading>
              <Text color="brand.secondary">
                Unable to fetch rooms... Try refreshing the page.
              </Text>
            </Stack>
          ) : null}
          <ListRooms rooms={rooms} />
        </GridItem>
      </Grid>
      <CustomModal show={isModalOpen} close={closeModal}>
        <RoomOptions closeModal={closeModal} />
      </CustomModal>
    </>
  );
};
