package model


import (
    "errors"

    valid "github.com/asaskevich/govalidator"
)

func isValidFlavor(flavor VmFlavor) bool {
    for _, FLAVOR := range VmFlavorList {
        if (flavor == FLAVOR) {
            return true
        }
    }
    return false
}

func validateVm(vmReq VmRB) error {
    if (valid.IsNull(vmReq.Name) || (vmReq.TopologyID <= 0) ||
            (vmReq.UserID <= 0) || (vmReq.VNCPort < 5900 && vmReq.VNCPort > 5999)) {
        return errors.New("Invalid request parameters")
    }

    if (!isValidFlavor(vmReq.Flavor) && valid.IsNull(vmReq.Disk) &&
            (vmReq.Vcpu == 0) && (vmReq.Ram == 0)) {
        return errors.New("Invalid request parameters")
    }

    return nil
}

