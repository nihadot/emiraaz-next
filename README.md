  <div className="flex mt-[15px] gap-[7.5px] bg-red-400 items-center sm:justify-end">
                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !px-[12px] !py-1.5 sm:!py-2 sm:!px-4 border-none text-[#FF1645] font-poppins rounded "

                >
                  <div className="flex items-center h-[26px] justify-center gap-2">
                    {isWishlist ? (
                      <GoHeartFill onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    ) : (
                      <GoHeart onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    )}
                    <label className="text-[12px] sm:text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
                  </div>
                </PrimaryButton>

                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !px-[14px] sm:!px-[16px] !py-1.5 sm:!py-2  w-fit border-none text-[#FF1645] font-poppins rounded "

                >
                  <div className="flex items-center gap-2 w-fit h-[25px]  sm:h-[28px] justify-center">
                    <div
                      onClick={() => handleShare(data?.data?.projectTitle || '')}
                      className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                      <PiShareFat
                        color='#FF1645'
                        size={20}
                      />
                      {/* <Image src={share_button_icon} alt="share icon" fill /> */}
                    </div>
                    <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Share </label>
                  </div>
                </PrimaryButton>


                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !py-1.5 sm:!py-2 px-[19px]  w-fit border-none text-[#FF1645] font-poppins rounded "

                >
                  <div

                    onClick={() => setEnquiryForm({ status: true, id: data?.data?._id || '', count: 1 })}
                    className="flex items-center gap-2 w-fit h-[25px] sm:h-[28px] justify-center">
                    <div className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                      {/* <Image src={notes_red_edit} alt="share icon" fill /> */}
                      <PiNotePencil
                        className="w-[25px] h-[22px]"
                        color="#FF1645"
                      />
                    </div>
                    <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Enquire Now </label>
                  </div>
                </PrimaryButton>

              </div>