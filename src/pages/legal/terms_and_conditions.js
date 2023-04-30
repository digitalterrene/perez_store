import React from "react";

export default function terms_and_conditions() {
  return (
    <div>
      <div className="flex justify-end items-center">
        <img
          className="object-cover md:hidden  w-full h-60"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_12_bg.png"
          alt="background"
        />
        <img
          className="hidden md:block object-cover  w-full h-56 lg:h-52"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_12_bg_ipad_desktop.png"
          alt="background"
        />
        <div className=" flex xl:px-20 justify-start items-start flex-col absolute">
          <h1 className="text-4xl">Terms and Conditions</h1>
        </div>
      </div>
      <div className="mx-auto px-10 flex flex-col bg-[#FAFAFA] mt-10 justify-center w-2/3">
        <div className="my-6 lg:my-24">
          <p className="text-xl font-medium p-2 text-white bg-zinc-300 mb-6 uppercase text-neutral-900">
            Access to and Use of Website
          </p>
          <p>
            The following general terms and conditions (“Terms and Conditions”)
            apply to your access to and use of the website (“Website”) of
            PerezShop Inc (“PerezShop”).
          </p>
        </div>
        <div className="my-6 lg:my-24">
          <p className="text-xl   text-white font-medium p-2  bg-zinc-300 mb-6  uppercase text-neutral-900">
            Intellectual Property
          </p>
          <p>
            All copyright, trade marks, design rights, patents and other
            intellectual property rights (registered and unregistered) in and on
            the Website and all content (including all applications) located on
            the Website shall remain vested in PerezShop Stores or its
            licensors. You may not copy, reproduce, republish, disassemble,
            decompile, reverse engineer, download, post, broadcast, transmit,
            make available to the public, or otherwise use the Website content
            in any way except for your own personal, non-commercial use. You
            also agree not to adapt, alter or create a derivative work from any
            Website content except for your own personal, non-commercial use.
            Any other use of the Website content requires the prior written
            permission of PerezShop Stores.
          </p>
          <p>
            The names, images and logos identifying PerezShop Stores or third
            parties and their products and services are subject to copyright,
            design rights and trade marks of PerezShop and/or third parties.
            Nothing contained in these terms shall be construed as conferring
            any license or right to use any trade mark, design right or
            copyright of PerezShop Stores or any other third party.
          </p>
        </div>
        <div className="my-6 lg:my-24">
          <p className="text-xl p-2 text-white  bg-zinc-300 mb-6  font-medium uppercase text-neutral-900">
            No Warranty
          </p>
          <p>
            This Website and all content are provided with all faults on an “as
            is” and “as available” basis. PerezShop Stores, its licensors and
            other suppliers disclaim all warranties, whether express or implied,
            including the warranties that the Website and all content are free
            of defects, virus free, and able to operate on an uninterrupted
            basis, that they will meet your requirements, or that errors will be
            corrected, and the implied warranties that the Website and all
            content are merchantable, of satisfactory quality, accurate, fit for
            a particular purpose or need, or non-infringing, unless such implied
            warranties are legally incapable of exclusion.
          </p>
          <p>
            No information given by PerezShop Stores, its affiliates or their
            respective employees or authorized agents shall create a warranty or
            expand the scope of any warranty that cannot be disclaimed under
            applicable law. Your use of this Website is solely at your own risk
            and PerezShop Stores is under no obligation to provide you with any
            support, error corrections, updates, upgrades, bug fixes and/or
            enhancements of the Website and all content. Some jurisdictions do
            not allow the exclusion of implied warranties, so the above
            exclusions may not apply to you.
          </p>
        </div>
        <div className="my-6 lg:my-24">
          <p className="text-xl font-medium text-white p-2  bg-zinc-300 mb-6  uppercase text-neutral-900">
            Limitation of Liability
          </p>
          <p>
            PerezShop Stores shall not be liable for any damages, resulting from
            or in connection with the use of the Website, regardless of the form
            of action. The foregoing limitation of liability shall not apply in
            the event that the damage results from the gross negligence of
            willful misconduct of PerezShop Stores’ executive management.
          </p>
        </div>
        <div className="my-6 lg:my-24">
          <p className="text-xl p-2 text-white  bg-zinc-300 mb-6  font-medium uppercase text-neutral-900">
            Changes to Website
          </p>
          <p>
            PerezShop Stores may change or discontinue any aspect, service,
            feature or content of the Website at any time, including, but not
            limited to, content, hours of availability, and equipment needed for
            access or use.
          </p>
        </div>
        <div className="my-6 lg:my-24">
          <p className="text-xl p-2 bg-gray-700  bg-zinc-300 mb-6  font-medium uppercase text-neutral-900">
            Applicable Law
          </p>
          <p>
            These Terms and Conditions will exclusively be governed by the laws
            of South Africa.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
